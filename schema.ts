import { list } from "@keystone-6/core"
import { password, relationship, select, text, timestamp } from "@keystone-6/core/fields"
import { document } from "@keystone-6/fields-document"

export const lists = {
    User: list({
        fields: {
            name: text({ validation: { isRequired: true } }),
            email: text({ validation: { isRequired: true }, isIndexed: "unique" }),
            password: password({ validation: { isRequired: true } }),
            authoredPosts: relationship({
                ref: "Post.author",
                many: true,
            }),
            editedPosts: relationship({
                ref: "Post.editor",
            }),
        },
    }),
    Post: list({
        fields: {
            title: text({ validation: { isRequired: true } }),
            content: document({
                formatting: true,
                links: true,
                dividers: true,
                layouts: [
                    [1, 1],
                    [1, 1, 1],
                    [2, 1],
                    [1, 2],
                    [1, 2, 1],
                ],
            }),
            createdAt: timestamp({ defaultValue: Date.now as any }),
            status: select({
                options: ["published", "draft"],
                defaultValue: "draft",
                ui: { displayMode: "segmented-control" },
            }),
            author: relationship({
                ref: "User.authoredPosts",
            }),
            editor: relationship({
                ref: "User.editedPosts",
            }),
            tags: relationship({
                ref: "Tag.posts",
                many: true,
            }),
        },
    }),
    Tag: list({
        fields: {
            name: text({ validation: { isRequired: true } }),
            posts: relationship({
                ref: "Post.tags",
                many: true,
            }),
            parent: relationship({
                ref: "Tag.children",
            }),
            children: relationship({
                ref: "Tag.parent",
                many: true,
            }),
        },
    }),
}
