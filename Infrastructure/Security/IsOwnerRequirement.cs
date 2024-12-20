using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Infrastructure.Security
{
    public class IsOwnerRequirement : IAuthorizationRequirement
    {

    }

    public class IsOwnerRequirementHandler : AuthorizationHandler<IsOwnerRequirement>
    {
        private readonly DataContext _dbContext;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public IsOwnerRequirementHandler(DataContext dbContext, IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
            _dbContext = dbContext;
        }

        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, IsOwnerRequirement requirement)
        {
            var userId = context.User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (userId == null) return Task.CompletedTask;

            var propertyId = Guid.Parse(_httpContextAccessor.HttpContext.Request.RouteValues.SingleOrDefault(x => x.Key == "id").Value?.ToString());

            var propertyOwner = _dbContext.PropertyOwners
                .AsNoTracking()
                .SingleOrDefaultAsync(p => p.AppUserId == userId && p.PropertyId == propertyId)
                .Result;

            if (propertyOwner == null) return Task.CompletedTask;

            context.Succeed(requirement);

            return Task.CompletedTask;
        }
    }
}