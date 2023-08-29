var builder = WebApplication.CreateBuilder(args);

// add services to controller

builder.Services.AddControllers(opt =>
           {
               var policy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
               opt.Filters.Add(new AuthorizeFilter(policy));
           });
builder.Services.AddApplicationServices(builder.Configuration);
builder.Services.AddIdentityServices(builder.Configuration);

//Configure the http request pipeline

var app = builder.Build();

app.UseMiddleware<ExceptionMiddleware>();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "WebAPIv5 v1"));
}

app.UseCors("CorsPolicy");

//app.UseHttpsRedirection();
app.UseAuthentication();

app.UseAuthorization();

app.UseDefaultFiles();
app.UseStaticFiles();

app.MapControllers();
app.MapFallbackToController("Index", "Fallback");

using var scope = app.Services.CreateScope();

var services = scope.ServiceProvider;

try
{
    var context = services.GetRequiredService<DataContext>();
    var userManager = services.GetRequiredService<UserManager<AppUser>>();
    await context.Database.MigrateAsync();
    await Seed.SeedData(context, userManager);
}
catch (System.Exception ex)
{
    var logger = services.GetRequiredService<ILogger<Program>>();
    logger.LogError($"Error while creating database: {ex.Message}");
}
await app.RunAsync();