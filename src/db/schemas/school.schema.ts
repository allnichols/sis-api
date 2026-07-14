import {
    pgTable, 
    uuid, 
    varchar,
    text,
    timestamp,
    boolean
} from "drizzle-orm/pg-core";

export const schools = pgTable("schools", {
    id: uuid("id")
        .defaultRandom()
        .primaryKey(),

    name: varchar("name", { length: 255 }).notNull(),
    phone: varchar("phone", { length: 20 }),
    email: varchar("email", { length: 255 }),
    website: varchar("website", { length: 255 }),
    isActive: boolean("is_active").default(true).notNull(),
    streetAddress: text("street_address").notNull(),
    city: varchar('city', { length: 100 }).notNull(),
    state: varchar("state", { length: 50 }).notNull(),
    zipCode: varchar("zip_code", { length: 20 }).notNull(),
    country: varchar("country", { length: 100 }).default("USA").notNull(),

    createAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
              .defaultNow()
              .$onUpdate(() => new Date())
              .notNull()

})