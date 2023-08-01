using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.IndigenousTypes
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public IndigenousType IndigenousType { get; set; }
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
                var currentIndigenousType = await _context.IndigenousTypes.FindAsync(request.IndigenousType.Id);

                if (currentIndigenousType != null)
                {
                    _context.Entry(currentIndigenousType).State = EntityState.Detached;

                    _context.Entry(request.IndigenousType).State = EntityState.Modified;

                    await _context.SaveChangesAsync();

                    return Result<Unit>.Success(Unit.Value);
                }
                else
                {
                    return Result<Unit>.Failure("Indigenous Type does not exists");
                }
            }
        }
    }
}