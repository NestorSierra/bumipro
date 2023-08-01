using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using MediatR;
using Microsoft.Extensions.Logging;
using Persistence;

namespace Application.Applications
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            public ApplicationDTO ApplicationDTO { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly ILogger<string> _logger;

            public Handler(DataContext context,
                           IMapper mapper,
                           ILogger<string> logger)
            {
                _logger = logger;
                _mapper = mapper;
                _context = context;

            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var application = _mapper.Map<Domain.Application>(request.ApplicationDTO);
                _context.Applications.Add(application);
                await _context.SaveChangesAsync();

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}