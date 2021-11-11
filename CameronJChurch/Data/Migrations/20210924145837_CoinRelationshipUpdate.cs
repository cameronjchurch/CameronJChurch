using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace CameronJChurch.Data.Migrations
{
    public partial class CoinRelationshipUpdate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Name",
                table: "Coins");

            migrationBuilder.AddColumn<bool>(
                name: "Active",
                table: "CoinTemplates",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "CoinTemplateId",
                table: "Coins",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedDate",
                table: "Bills",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.CreateIndex(
                name: "IX_Coins_CoinTemplateId",
                table: "Coins",
                column: "CoinTemplateId");

            migrationBuilder.AddForeignKey(
                name: "FK_Coins_CoinTemplates_CoinTemplateId",
                table: "Coins",
                column: "CoinTemplateId",
                principalTable: "CoinTemplates",
                principalColumn: "CoinTemplateId",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Coins_CoinTemplates_CoinTemplateId",
                table: "Coins");

            migrationBuilder.DropIndex(
                name: "IX_Coins_CoinTemplateId",
                table: "Coins");

            migrationBuilder.DropColumn(
                name: "Active",
                table: "CoinTemplates");

            migrationBuilder.DropColumn(
                name: "CoinTemplateId",
                table: "Coins");

            migrationBuilder.DropColumn(
                name: "CreatedDate",
                table: "Bills");

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "Coins",
                type: "TEXT",
                nullable: true);
        }
    }
}
