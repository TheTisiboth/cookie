import prisma from "@/lib/prisma"
import { RecipeComponent } from "./Recipe"

export default async function Home() {
  const recipes = await prisma.recipe.findMany()
  const user = await prisma.user.findFirst()
  console.log(recipes)
  console.log("Recipe loaded")

  return (
    <main>
      <h1>Home</h1>
      <h2>User</h2>
      <p>User: {user?.name}</p>
      {recipes.map((recipe) => (
        <RecipeComponent key={recipe.id} {...recipe} />
      ))}
    </main>
  )
}
