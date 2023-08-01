using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.IndigenousTypes
{
    public class List
    {

        public class Query : IRequest<Result<List<IndigenousType>>>
        {
            public string Name { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<List<IndigenousType>>>
        {
            private readonly DataContext _context;


            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<List<IndigenousType>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query = _context.IndigenousTypes.AsQueryable();

                if (!string.IsNullOrEmpty(request.Name))
                {
                    query = query.Where(t => t.Name.Contains(request.Name)).AsQueryable();
                }

                var categories = await query.ToListAsync();

                return Result<List<IndigenousType>>.Success(categories);
            }
        }

    }
}