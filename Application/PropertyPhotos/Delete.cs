using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.PropertyPhotos
{
    public class Delete
    {
        public class Command : IRequest<Result<Unit>>
        {
            public string Id { get; set; }
            public Guid PropertyId { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IPhotoAccessor _photoAccessor;

            public Handler(DataContext context, IPhotoAccessor photoAccessor)
            {
                _photoAccessor = photoAccessor;
                _context = context;
            }


            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var property = await _context.Properties.Include(t => t.PropertyPhotos).FirstOrDefaultAsync(t => t.Id == request.PropertyId);

                if (property == null) return null;

                var photo = property.PropertyPhotos.FirstOrDefault(t => t.Id == request.Id);

                if (photo == null) return null;

                if (photo.IsMain) return Result<Unit>.Failure("You cannot delete your main photo");

                var result = await _photoAccessor.DeletePhoto(request.Id);

                if (result == null) return Result<Unit>.Failure("Problem deleting photo from Cloudinary");

                property.PropertyPhotos.Remove(photo);

                var success = await _context.SaveChangesAsync() > 0;

                if (!success) return Result<Unit>.Failure("Problem deleting photo");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}