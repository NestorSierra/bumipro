using System;
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
    public class Details
    {
        public class Query : IRequest<Result<PropertyDTO>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<PropertyDTO>>
        {

            private readonly DataContext _contex;
            private readonly IMapper _mapper;

            public Handler(DataContext contex, IMapper mapper)
            {
                _contex = contex;
                _mapper = mapper;
            }

            public async Task<Result<PropertyDTO>> Handle(Query request, CancellationToken cancellationToken)
            {
                var PropertyDTO = await _contex.Properties.Include(t => t.PropertyPhotos).ProjectTo<PropertyDTO>(_mapper.ConfigurationProvider).SingleOrDefaultAsync(t => t.Id == request.Id);

                return Result<PropertyDTO>.Success(PropertyDTO);
            }
        }

    }
}