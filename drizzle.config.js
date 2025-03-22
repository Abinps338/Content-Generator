/** @type { import ("drizzle-kit").Config } */
export default {
     schema : "./utils/schema.tsx",
     dialect: 'postgresql',
     dbCredentials:{
        url: 'postgresql://neondb_owner:npg_zDWTfVl7Aw3C@ep-wandering-cell-a52zmk5d-pooler.us-east-2.aws.neon.tech/Ai-Content-genrator?sslmode=require',
     }
}