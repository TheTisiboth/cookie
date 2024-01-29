"use client"

import { Recipe } from "@prisma/client"
import { FC } from "react"
import { toast } from "sonner"

export const RecipeComponent: FC<Recipe> = ({ title, description }) => {
  return (
    <>
      <button onClick={() => toast.success("Recipe loaded")}>Click</button>
      <h2>Recipe</h2>
      <h1>{`Title: ${title}`}</h1>
      <p>{`Description: ${description}`}</p>
    </>
  )
}
