import { pgTable, serial, text, varchar, timestamp, integer, pgEnum, uuid } from "drizzle-orm/pg-core";
import { schools } from "./school.schema.ts";
import { relations } from "drizzle-orm";

export const roleEnum = pgEnum('user_role', ['admin', 'teacher', 'staff']);

export const users = pgTable('users', {
    id: uuid().defaultRandom().primaryKey(),
    schoolId: integer('school_id')
        .notNull()
        .references(() => schools.id, { onDelete: 'cascade' }),

    firstName: varchar('first_name', { length: 50 }).notNull(),
    lastName: varchar('last_name', { length: 50}).notNull(),
    email: varchar('email', { length: 255 }).notNull().unique(),
    role: roleEnum('role').default('teacher').notNull(),

    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const teacherProfiles = pgTable('teacher_profiles', {
    id: serial('id').primaryKey(),

    userId: integer('user_id')
        .notNull()
        .unique() // Enforces 1-to-1 relationship
        .references(() => users.id, { onDelete: 'cascade' }),

    hireDate: timestamp('hire_date')

    // classrooms / classes

});


// Relations
export const usersRelations = relations(users, ({ one }) => ({
    school: one(schools, {
        fields: [users.schoolId],
        references: [schools.id]
    }),
    teacherProfiles: one(teacherProfiles, {
        fields: [users.id],
        references: [teacherProfiles.userId]
    })
}));

export const teacherProfilesRelations = relations(teacherProfiles, ({ one }) => ({
  user: one(users, {
    fields: [teacherProfiles.userId],
    references: [users.id],
  }),
}));

export const schoolsUsersRelations = relations(schools, ({ many }) => ({
  employees: many(users),
})); 