# :space_invader: Scale Vercel Template :space_invader:

This is the Scale Vercel Template. It is based off of the [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app), but modified to use the Scale UI Radix components/theme.

This template includes examples of:
- Dynamic routing
- File uploads
- GET/POST API calls

The template deployment in Vercel can be viewed at https://vercel-template-gold-delta.vercel.app/. 

## :bulb: Getting Started

1. `yarn install`
2. Then run the development server with `yarn dev`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The page auto-updates as you edit the file.

## :seedling: Environment Variables

You can define environment variables for each Vercel project. Any sensitive information should be stored as an environment variable and not hardcoded in the codebase.

[Vercel Environment Variable Documentation](https://vercel.com/docs/projects/environment-variables)

## :rocket: Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Steps to Deploy:
1. Request Vercel-Admin access on Opal
2. Add New Project
3. Import Git Repository -> scaleapi/<project-name>
4. If the repo isn't found, click Configure Github App -> scaleapi (Configure) -> Select repository -> Update Access. Ask Security to approve Vercel access to the repo. 
5. Set Build Command to `./vercel-build.sh`.
6. Set the Environment Variables to the three keys defined in the "Vercel keys Codeartifact access" 1Password shared vault.
7. Define other environment variables.
8. Deploy!
