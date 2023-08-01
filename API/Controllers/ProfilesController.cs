using System.Threading.Tasks;
using Application.Profiles;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ProfilesController : BaseApiController
    {

        [HttpGet("{username}")]
        public async Task<IActionResult> GetProfiles(string username)
        {
            return HandleResult(await Mediator.Send(new Details.Query { UserName = username }));
        }

        [HttpPut]
        public async Task<IActionResult> UpdateProfile(ProfileFormValues profile)
        {
            return HandleResult(await Mediator.Send(new Edit.Command { Profile = profile }));
        }

    }
}