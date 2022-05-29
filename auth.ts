import { createAuth } from "@keystone-6/auth"
import { statelessSessions } from "@keystone-6/core/session"

const { withAuth } = createAuth({
    listKey: "User",
    identityField: "email",
    sessionData: "name",
    secretField: "password",
    initFirstItem: {
        fields: ["name", "email", "password"],
    },
})

const session = statelessSessions({
    maxAge: 60 * 60 * 24 * 7,
    secret: "52e08993-8627-4de4-8608-1733277bb6fa",
})

export { withAuth, session }
