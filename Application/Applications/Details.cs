using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Applications
{
    public class Details
    {
        public class Query : IRequest<Result<ApplicationDTO>>
        {
            public Guid ReferenceNumber { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<ApplicationDTO>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<Result<ApplicationDTO>> Handle(Query request, CancellationToken cancellationToken)
            {
                var restaurant = await _context.Applications
                    .ProjectTo<ApplicationDTO>(_mapper.ConfigurationProvider)
                    .FirstOrDefaultAsync(t => t.ReferenceNumber == request.ReferenceNumber);

                return Result<ApplicationDTO>.Success(restaurant);
            }
        }
    }
}