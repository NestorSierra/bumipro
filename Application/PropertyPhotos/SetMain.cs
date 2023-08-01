using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.PropertyPhotos
{
    public class SetMain
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid PropertyId { get; set; }
            public string Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;

            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var property = await _context.Properties.Include(t => t.PropertyPhotos).FirstOrDefaultAsync(t => t.Id == request.PropertyId);

                if (property == null) return null;

                var photoProperty = property.PropertyPhotos.FirstOrDefault(t => t.Id == request.Id);

                if (photoProperty == null) return null;

                var currentMain = property.PropertyPhotos.FirstOrDefault(t => t.IsMain == true);

                if (currentMain != null) currentMain.IsMain = false;

                photoProperty.IsMain = true;

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Result<Unit>.Success(Unit.Value);

                return Result<Unit>.Failure("Failed to set main photo");
            }
        }
    }
}