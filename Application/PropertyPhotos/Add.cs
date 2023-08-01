using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.PropertyPhotos
{
    public class Add
    {
        public class Command : IRequest<Result<PropertyPhoto>>
        {
            public IFormFile File { get; set; }
            public Guid PropertyId { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<PropertyPhoto>>
        {
            private readonly IPhotoAccessor _photoAccessor;
            private readonly DataContext _context;

            public Handler(DataContext context, IPhotoAccessor photoAccessor)
            {
                _context = context;
                _photoAccessor = photoAccessor;
            }

            public async Task<Result<PropertyPhoto>> Handle(Command request, CancellationToken cancellationToken)
            {
                var property = await _context.Properties.Include(t => t.PropertyPhotos).FirstOrDefaultAsync(t => t.Id == request.PropertyId);

                if (property == null) return null;

                var photoUploadResult = await _photoAccessor.AddPhoto(request.File);

                var photo = new PropertyPhoto
                {
                    Url = photoUploadResult.Url,
                    Id = photoUploadResult.PublicId
                };

                if (!property.PropertyPhotos.Any(x => x.IsMain)) photo.IsMain = true;

                property.PropertyPhotos.Add(photo);

                var result = await _context.SaveChangesAsync() > 0;

                if (result) return Result<PropertyPhoto>.Success(photo);

                return Result<PropertyPhoto>.Failure("Failed to add photo in the property");
            }
        }
    }
}