using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace CamoReact.Models;

public partial class CamoContext : DbContext
{
    public CamoContext()
    {
    }

    public CamoContext(DbContextOptions<CamoContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Cantieri> Cantieris { get; set; }

    public virtual DbSet<FotoCantiere> FotoCantieres { get; set; }

    public virtual DbSet<Utenti> Utentis { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.UseSqlServer("Name=CamoConnection");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Cantieri>(entity =>
        {
            entity.HasKey(e => e.IdCantiere).HasName("PK_Progetti");

            entity.ToTable("Cantieri");

            entity.Property(e => e.IdCantiere).HasColumnName("id_Cantiere");
            entity.Property(e => e.DataInserimento)
                .HasColumnType("datetime")
                .HasColumnName("dataInserimento");
            entity.Property(e => e.Descrizione).HasColumnType("text");
            entity.Property(e => e.DescrizioneBreve)
                .HasMaxLength(250)
                .IsUnicode(false)
                .HasColumnName("Descrizione_Breve");
            entity.Property(e => e.Eliminato).HasColumnName("eliminato");
            entity.Property(e => e.PathFotoCopertina)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("path_foto_copertina");
        });

        modelBuilder.Entity<FotoCantiere>(entity =>
        {
            entity.HasKey(e => e.IdPathFotoCantiere);

            entity.ToTable("Foto_Cantiere");

            entity.Property(e => e.IdPathFotoCantiere).HasColumnName("id_PathFoto_Cantiere");
            entity.Property(e => e.Eliminato).HasColumnName("eliminato");
            entity.Property(e => e.IdCantiere).HasColumnName("id_Cantiere");
            entity.Property(e => e.PathFoto)
                .HasMaxLength(255)
                .IsUnicode(false)
                .HasColumnName("pathFoto");
        });

        modelBuilder.Entity<Utenti>(entity =>
        {
            entity.HasKey(e => e.IdUtente);

            entity.ToTable("Utenti");

            entity.Property(e => e.IdUtente).HasColumnName("id_utente");
            entity.Property(e => e.Cognome)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("cognome");
            entity.Property(e => e.Email)
                .IsUnicode(false)
                .HasColumnName("email");
            entity.Property(e => e.IdRuolo).HasColumnName("id_ruolo");
            entity.Property(e => e.Nome)
                .HasMaxLength(50)
                .IsUnicode(false)
                .HasColumnName("nome");
            entity.Property(e => e.Password)
                .IsUnicode(false)
                .HasColumnName("password");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
