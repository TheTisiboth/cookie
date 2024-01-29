import prisma from "./lib/prisma"

export default async function Home() {
  const recipes = await prisma.recipe.findMany()

  return (
    <main>
      <div>
        <h1>Home</h1>
        <p>Recipe: {recipes[0]?.title}</p>
      </div>
    </main>
  )
}
