using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using MediatR;
using Persistence;

namespace Application.Properties
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
            public PropertyDTO PropertyDTO { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var currentProperty = await _context.Properties.FindAsync(request.Id);

                if (currentProperty == null)
                    return null;

                _mapper.Map(request.PropertyDTO, currentProperty);

                await _context.SaveChangesAsync();

                return Result<Unit>.Success(Unit.Value);

            }
        }
    }
}