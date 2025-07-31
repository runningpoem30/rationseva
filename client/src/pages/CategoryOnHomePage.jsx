import React from 'react'
import CategoryWiseDataOnHomePage from '@/components/CategoryWiseDataOnHomePage'

function CategoryOnHomePage() {
  return (
    <div>
      <CategoryWiseDataOnHomePage category={"Dairy,Bread and Eggs"}/>
      <CategoryWiseDataOnHomePage category={"Snacks and Munchies"}/>
      <CategoryWiseDataOnHomePage  category={"Cold Drink and Juices"}/>
      <CategoryWiseDataOnHomePage category={"Sweet Tooth"}/>
    </div>
  )
}

export default CategoryOnHomePage
