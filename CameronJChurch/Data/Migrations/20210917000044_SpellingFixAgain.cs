using Microsoft.EntityFrameworkCore.Migrations;

namespace CameronJChurch.Data.Migrations
{
    public partial class SpellingFixAgain : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Bills_BillTemplates_BillTempalteBillTemplateId",
                table: "Bills");

            migrationBuilder.RenameColumn(
                name: "BillTempalteBillTemplateId",
                table: "Bills",
                newName: "BillTemplateId");

            migrationBuilder.RenameIndex(
                name: "IX_Bills_BillTempalteBillTemplateId",
                table: "Bills",
                newName: "IX_Bills_BillTemplateId");

            migrationBuilder.AddForeignKey(
                name: "FK_Bills_BillTemplates_BillTemplateId",
                table: "Bills",
                column: "BillTemplateId",
                principalTable: "BillTemplates",
                principalColumn: "BillTemplateId",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Bills_BillTemplates_BillTemplateId",
                table: "Bills");

            migrationBuilder.RenameColumn(
                name: "BillTemplateId",
                table: "Bills",
                newName: "BillTempalteBillTemplateId");

            migrationBuilder.RenameIndex(
                name: "IX_Bills_BillTemplateId",
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
    }
}
