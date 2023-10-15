using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Properties
{
    public class List
    {
        public class Query : IRequest<Result<PagedList<PropertyDTO>>>
        {
            public PropertyParams Params { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<PagedList<PropertyDTO>>>
        {

            private readonly IMapper _mapper;
            private readonly DataContext _context;

            public Handler(IMapper mapper, DataContext context)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<PagedList<PropertyDTO>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query = _context.PropertyOwners
                            .Include(t => t.Property)
                            .ThenInclude(t => t.PropertyPhotos)
                            .Include(t => t.AppUser)
                            .Select(t => t.Property)
                            .ProjectTo<PropertyDTO>(_mapper.ConfigurationProvider)
                            .AsQueryable();

                if (!string.IsNullOrEmpty(request.Params.Country))
                {
                    query = query.Where(t => t.Country == request.Params.Country).AsQueryable();
                }

                if (request.Params.Category != "all")
                {
                    query = query.Where(t => t.Category == request.Params.Category).AsQueryable();
                }

                if (!string.IsNullOrEmpty(request.Params.Location))
                {
                    query = query.Where(t => EF.Functions.Like(t.SearchLocation.ToLower(), $"%{request.Params.Location.ToLower()}%")).AsQueryable();
                }

                return Result<PagedList<PropertyDTO>>.Success(await PagedList<PropertyDTO>.CreateAsync(query, request.Params.PageNumber, request.Params.PageSize));

            }
        }

    }
}