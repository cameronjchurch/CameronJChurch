using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace CameronJChurch.Data.Migrations
{
    public partial class CoinTotalHistory : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Coins_CoinTemplates_CoinTemplateId",
                table: "Coins");

            migrationBuilder.AlterColumn<int>(
                name: "CoinTemplateId",
                table: "Coins",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "INTEGER",
                oldNullable: true);

            migrationBuilder.CreateTable(
                name: "CoinTotalHistory",
                columns: table => new
                {
                    CoinTotalId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    TotalCost = table.Column<decimal>(type: "TEXT", nullable: true),
                    TotalValue = table.Column<decimal>(type: "TEXT", nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "TEXT", nullable: false),
                    UserName = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CoinTotalHistory", x => x.CoinTotalId);
                });

            migrationBuilder.AddForeignKey(
                name: "FK_Coins_CoinTemplates_CoinTemplateId",
                table: "Coins",
                column: "CoinTemplateId",
                principalTable: "CoinTemplates",
                principalColumn: "CoinTemplateId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Coins_CoinTemplates_CoinTemplateId",
                table: "Coins");

            migrationBuilder.DropTable(
                name: "CoinTotalHistory");

            migrationBuilder.AlterColumn<int>(
                name: "CoinTemplateId",
                table: "Coins",
                type: "INTEGER",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "INTEGER");

            migrationBuilder.AddForeignKey(
                name: "FK_Coins_CoinTemplates_CoinTemplateId",
                table: "Coins",
                column: "CoinTemplateId",
                principalTable: "CoinTemplates",
                principalColumn: "CoinTemplateId",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
