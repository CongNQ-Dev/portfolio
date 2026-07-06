import type { PrismaClient } from "@prisma/client";
import type { IProjectRepository } from "../../domain/repositories/IProjectRepository";
import type { Project, ProjectLink } from "../../domain/entities/Project";

export class PrismaProjectRepository implements IProjectRepository {
  constructor(private readonly db: PrismaClient) {}

  async findAll(): Promise<Project[]> {
    const rows = await this.db.project.findMany({
      orderBy: { order: "asc" },
    });
    return rows.map(toProject);
  }

  async findBySlug(slug: string): Promise<Project | null> {
    const row = await this.db.project.findUnique({ where: { slug } });
    return row ? toProject(row) : null;
  }
}

/**
 * toProject — maps a raw Prisma row to the clean domain entity.
 *
 * The `links` field is stored as Json in Postgres. Prisma deserialises it to
 * `unknown`, so we cast it here — the one place we trust the shape matches
 * what the seed script wrote.
 */
function toProject(row: {
  id: string;
  slug: string;
  tag: string;
  name: string;
  desc: string;
  tech: string[];
  featuresLabel: string;
  features: string[];
  links: unknown;
  type: string;
  iconPath: string | null;
  visualVariant: string | null;
  order: number;
}): Project {
  return {
    id: row.id,
    slug: row.slug,
    tag: row.tag,
    name: row.name,
    desc: row.desc,
    tech: row.tech,
    featuresLabel: row.featuresLabel,
    features: row.features,
    links: row.links as ProjectLink[],
    type: row.type,
    iconPath: row.iconPath,
    visualVariant: row.visualVariant,
    order: row.order,
  };
}
