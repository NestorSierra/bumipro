using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    public partial class AddRefreshTableRefreshToken : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable("RefreshToken");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
