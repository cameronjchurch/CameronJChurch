using Microsoft.EntityFrameworkCore.Migrations;

namespace CameronJChurch.Data.Migrations
{
    public partial class SpellingFix : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Bills_BillTemplates_BillTempalteId",
                table: "Bills");

            migrationBuilder.RenameColumn(
                name: "BillTempalteId",
                table: "BillTemplates",
                newName: "BillTemplateId");

            migrationBuilder.RenameColumn(
                name: "BillTempalteId",
                table: "Bills",
                newName: "BillTempalteBillTemplateId");

            migrationBuilder.RenameIndex(
                name: "IX_Bills_BillTempalteId",
                table: "Bills",
                newName: "IX_Bills_BillTempalteBillTemplateId");

            migrationBuilder.AddForeignKey(
                name: "FK_Bills_BillTemplates_BillTempalteBillTemplateId",
                table: "Bills",
                column: "BillTempalteBillTemplateId",
                principalTable: "BillTemplates",
                principalColumn: "BillTemplateId",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Bills_BillTemplates_BillTempalteBillTemplateId",
                table: "Bills");

            migrationBuilder.RenameColumn(
                name: "BillTemplateId",
                table: "BillTemplates",
                newName: "BillTempalteId");

            migrationBuilder.RenameColumn(
                name: "BillTempalteBillTemplateId",
                table: "Bills",
                newName: "BillTempalteId");

            migrationBuilder.RenameIndex(
                name: "IX_Bills_BillTempalteBillTemplateId",
                table: "Bills",
                newName: "IX_Bills_BillTempalteId");

            migrationBuilder.AddForeignKey(
                name: "FK_Bills_BillTemplates_BillTempalteId",
                table: "Bills",
                column: "BillTempalteId",
                principalTable: "BillTemplates",
                principalColumn: "BillTempalteId",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
