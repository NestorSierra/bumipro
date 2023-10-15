using System;
using System.Threading.Tasks;
using Application.Properties;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class PropertiesController : BaseApiController
    {

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProperty(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query { Id = id }));
        }

        [Route("getMyOwn")]
        [HttpGet]
        public async Task<IActionResult> GetMyProperties([FromQuery] PropertyParams param)
        {
            return HandlePageResult(await Mediator.Send(new MyProperties.Query { Params = param }));
        }

        [HttpGet]
        public async Task<IActionResult> GetProperties([FromQuery] PropertyParams param)
        {
            return HandlePageResult(await Mediator.Send(new List.Query { Params = param }));
        }

        [HttpPost]
        public async Task<IActionResult> CreateProperty(PropertyDTO propertyDTO)
        {
            return HandleResult(await Mediator.Send(new Create.Command { PropertyDTO = propertyDTO }));
        }

        //[Authorize(Policy = "IsOwnerOfProperty")]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProperty(Guid id, [FromBody] PropertyDTO branchDTO)
        {
            return HandleResult(await Mediator.Send(new Edit.Command { Id = id, PropertyDTO = branchDTO }));
        }

        [HttpPost("{id}/uploadPhoto")]
        public async Task<IActionResult> UploadPropertyPhoto(Guid id, [FromForm] IFormFile file)
        {
            return HandleResult(await Mediator.Send(new Application.PropertyPhotos.Add.Command { File = file, PropertyId = id }));
        }

        [HttpPut("{id}/setMainPhoto/{photoId}")]
        public async Task<IActionResult> UploadPropertyPhoto(Guid id, string photoId)
        {
            return HandleResult(await Mediator.Send(new Application.PropertyPhotos.SetMain.Command { PropertyId = id, Id = photoId }));
        }

        [HttpDelete("{id}/removePhoto/{photoId}")]
        public async Task<IActionResult> DeletePropertyPhoto(Guid id, string photoId)
        {
            return HandleResult(await Mediator.Send(new Application.PropertyPhotos.Delete.Command { PropertyId = id, Id = photoId }));
        }
    }
}