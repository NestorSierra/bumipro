using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
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

            private readonly IUserAccessor _userAccessor;

            public Handler(IMapper mapper, DataContext context, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<PagedList<PropertyDTO>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query = _context.PropertyOwners
                            .Include(t => t.Property)
                            .ThenInclude(t => t.PropertyPhotos)
                            .Include(t => t.AppUser)
                            .Where(t => t.AppUser.UserName == _userAccessor.GetUsername())
                            .Select(t => t.Property)
                            .ProjectTo<PropertyDTO>(_mapper.ConfigurationProvider)
                            .AsQueryable();

                if (!string.IsNullOrEmpty(request.Params.Country))
                {
                    query = query.Where(t => t.Country == request.Params.Country).AsQueryable();
                }

                return Result<PagedList<PropertyDTO>>.Success(await PagedList<PropertyDTO>.CreateAsync(query, request.Params.PageNumber, request.Params.PageSize));

            }
        }

    }
}