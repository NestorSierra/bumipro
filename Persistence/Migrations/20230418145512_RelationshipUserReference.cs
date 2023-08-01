using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class RelationshipUserReference : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserReferences_AspNetUsers_AppUserId",
                table: "UserReferences");

            migrationBuilder.RenameColumn(
                name: "AppUserId",
                table: "UserReferences",
                newName: "UserId");

            migrationBuilder.RenameIndex(
                name: "IX_UserReferences_AppUserId",
                table: "UserReferences",
                newName: "IX_UserReferences_UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_UserReferences_AspNetUsers_UserId",
                table: "UserReferences",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserReferences_AspNetUsers_UserId",
                table: "UserReferences");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "UserReferences",
                newName: "AppUserId");

            migrationBuilder.RenameIndex(
                name: "IX_UserReferences_UserId",
                table: "UserReferences",
                newName: "IX_UserReferences_AppUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_UserReferences_AspNetUsers_AppUserId",
                table: "UserReferences",
                column: "AppUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
