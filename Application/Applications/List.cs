using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Persistence;

namespace Application.Applications
{
    public class List
    {
        public class Query : IRequest<Result<PagedList<ApplicationDTO>>>
        {
            public ApplicationParams Params { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<PagedList<ApplicationDTO>>>
        {
            private readonly IMapper _mapper;
            private readonly DataContext _context;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<PagedList<ApplicationDTO>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query = _context.Applications.ProjectTo<ApplicationDTO>(_mapper.ConfigurationProvider).AsQueryable();

                if (request.Params.PropertyId.HasValue)
                {
                    query = query.Where(t => t.PropertyId == request.Params.PropertyId.Value);
                }

                return Result<PagedList<ApplicationDTO>>.Success(await PagedList<ApplicationDTO>.CreateAsync(query, request.Params.PageNumber, request.Params.PageSize));

            }
        }
    }
}