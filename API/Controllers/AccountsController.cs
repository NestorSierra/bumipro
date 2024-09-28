using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.DTOs;
using API.Services;
using Application.Applicant;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountsController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly TokenService _tokenService;
        public AccountsController(UserManager<AppUser> userManager, TokenService tokenService)
        {
            _tokenService = tokenService;
            _userManager = userManager;

        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDTO)
        {
            var user = await _userManager.Users
                .Include(p => p.Photos)
                .FirstOrDefaultAsync(t => t.Email == loginDTO.Email);

            if (user == null) return Unauthorized();

            var result = await _userManager.CheckPasswordAsync(user, loginDTO.Password);

            if (result)
            {
                await SetRefreshToken(user);
                return CreateUserObject(user);
            }


            return Unauthorized();
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if (await _userManager.Users.AnyAsync(u => u.UserName == registerDto.Username))
            {
                ModelState.AddModelError("username", "Username is already taken");
                return ValidationProblem();
            }

            if (await _userManager.Users.AnyAsync(u => u.Email == registerDto.Email))
            {
                ModelState.AddModelError("username", "Username is already taken");
                return ValidationProblem();
            }

            var user = new AppUser
            {
                FirstName = registerDto.FirstName,
                FamilyName = registerDto.FamilyName,
                UserName = registerDto.Username,
                Email = registerDto.Email
            };

            var result = await _userManager.CreateAsync(user, registerDto.Password);

            if (result.Succeeded)
            {
                await SetRefreshToken(user);

                return CreateUserObject(user);
            }

            return BadRequest(result.Errors);
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            var user = await _userManager.Users
                .Include(t => t.Photos)
                .FirstOrDefaultAsync(t => t.Email == User.FindFirstValue(ClaimTypes.Email));

            await SetRefreshToken(user);

            return CreateUserObject(user);
        }

        [Authorize]
        [Route("getApplicant")]
        [HttpGet]
        public async Task<ActionResult<ApplicantDTO>> GetCurrentApplicant()
        {
            var user = await _userManager.Users
                .Include(t => t.Photos)
                .FirstOrDefaultAsync(t => t.Email == User.FindFirstValue(ClaimTypes.Email));

            await SetRefreshToken(user);

            return CreateApplicantObject(user);
        }

        [Authorize]
        [HttpPost("refreshToken")]
        public async Task<ActionResult<UserDto>> RefreshToken()
        {
            var refreshToken = Request.Cookies["refreshToken"];
            var user = await _userManager.Users
                .Include(t => t.RefreshTokens)
                .Include(t => t.Photos)
                .FirstOrDefaultAsync(t => t.UserName == User.FindFirstValue(ClaimTypes.Name));

            if (user == null) return Unauthorized();

            var oldToken = user.RefreshTokens.SingleOrDefault(t => t.Token == refreshToken);

            if (oldToken != null && !oldToken.IsActive) return Unauthorized();

            if (oldToken != null) oldToken.Revoked = DateTime.UtcNow;

            return CreateUserObject(user);
        }


        private async Task SetRefreshToken(AppUser user)
        {
            var refreshToken = _tokenService.GenerateRefreshToken();

            user.RefreshTokens.Add(refreshToken);

            await _userManager.UpdateAsync(user);

            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Expires = DateTime.UtcNow.AddDays(7)
            };

            Response.Cookies.Append("refreshToken", refreshToken.Token, cookieOptions);
        }

        private UserDto CreateUserObject(AppUser user)
        {
            return new UserDto
            {
                FirstName = user.FirstName,
                LastName = user.FamilyName,
                About = user.About,
                DisplayName = user.FirstName + " " + user.FamilyName,
                Image = user?.Photos?.FirstOrDefault(t => t.IsMain)?.Url,
                Token = _tokenService.CreateToken(user),
                Username = user.UserName,
                Email = user.Email,
                Mobile = user.Mobile

            };
        }

        private ApplicantDTO CreateApplicantObject(AppUser user)
        {
            return new ApplicantDTO
            {
                About = user.About,
                City = user.City,
                Country = user.Country,
                DisplayName = $"{user.FirstName} {user.FamilyName}",
                Id = user.Id,
                Image = user?.Photos?.FirstOrDefault(t => t.IsMain)?.Url,
                IndigenousType = user.IndigenousType,
                IsAdult = user.IsAdult,
                IsIndigenous = user.IsIndigenous,
                Mobile = user.Mobile,
                Phone = user.Phone,
                Postcode = user.Postcode,
                Profesion = user.Profession,
                RelationshipStatus = user.RelationshipStatus,
                SalaryPerYear = user.SalaryPerYear,
                Status = user.Status,
                UserType = user.UserType,
            };
        }
    }
}