using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Persistence;

namespace Application.IndigenousTypes
{
    public class Details
    {
        public class Query : IRequest<Result<IndigenousType>>
        {
            public int Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<IndigenousType>>
        {
            private readonly DataContext _context;


            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<IndigenousType>> Handle(Query request, CancellationToken cancellationToken)
            {
                var IndigenousType = await _context.IndigenousTypes.FindAsync(request.Id);

                return Result<IndigenousType>.Success(IndigenousType);
            }
        }
    }
}