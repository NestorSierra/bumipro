using System;
using System.Threading.Tasks;
using Application.Applications;
using Application.Core;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ApplicationsController : BaseApiController
    {
        [HttpGet("{referenceNumber}")]
        public async Task<IActionResult> GetApplication(Guid referenceNumber)
        {
            return HandleResult(await Mediator.Send(new Details.Query { ReferenceNumber = referenceNumber }));
        }

        [HttpGet]
        public async Task<IActionResult> GetApplications([FromQuery] ApplicationParams param)
        {
            return HandlePageResult(await Mediator.Send(new List.Query { Params = param }));
        }

        [HttpPost]
        public async Task<IActionResult> CreateCategory(ApplicationDTO applicationDTO)
        {
            return HandleResult(await Mediator.Send(new Create.Command { ApplicationDTO = applicationDTO }));
        }

        [HttpPut]
        public async Task<IActionResult> EditCategory(ApplicationDTO applicationDTO)
        {
            return HandleResult(await Mediator.Send(new Edit.Command { ApplicationDTO = applicationDTO }));
        }
    }
}