using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Application> Applications { get; set; }
        public DbSet<IndigenousType> IndigenousTypes { get; set; }
        public DbSet<Property> Properties { get; set; }
        public DbSet<PropertyOwner> PropertyOwners { get; set; }
        public DbSet<UserJob> UserJobs { get; set; }
        public DbSet<UserReference> UserReferences { get; set; }
        public DbSet<Photo> Photos { get; set; }
        public DbSet<PropertyPhoto> PropertyPhotos { get; set; }
        public DbSet<RefreshToken> RefreshTokens { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Application>(x => x.HasKey(a => new { a.AppUserId, a.PropertyId }));

            builder.Entity<Application>()
                .HasOne(u => u.AppUser)
                .WithMany(a => a.Applications)
                .HasForeignKey(a => a.AppUserId);

            builder.Entity<Application>()
                .HasOne(u => u.Property)
                .WithMany(a => a.Applications)
                .HasForeignKey(a => a.PropertyId);


            builder.Entity<PropertyOwner>(x => x.HasKey(a => new { a.AppUserId, a.PropertyId }));

            builder.Entity<PropertyOwner>()
                .HasOne(u => u.AppUser)
                .WithMany(a => a.PropertyOwners)
                .HasForeignKey(a => a.AppUserId);

            builder.Entity<PropertyOwner>()
                .HasOne(u => u.Property)
                .WithMany(a => a.PropertyOwners)
                .HasForeignKey(a => a.PropertyId);

            builder.Entity<UserReference>()
            .HasOne(ur => ur.User)
            .WithMany(m => m.UserReferences)
            .HasForeignKey(ur => ur.UserId);


        }
    }
}