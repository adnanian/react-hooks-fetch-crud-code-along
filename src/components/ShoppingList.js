import React, { useEffect, useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  // Step #1 - Add useEffect
  useEffect(() => {
    fetch("http://localhost:4000/items")
      .then((response) => response.json())
      .then((items) => setItems(items));
  }, []);

  // Step #3 - add this function to handle addition of new items in the list.
  function handleAddItem(newItem) {
    //console.log("In ShoppingList:", newItem);
    setItems([...items, newItem]);
  }

  // Step #5 - add this function to handle change in key values of objects in item array
  function handleUpdateItem(updatedItem) {
    //console.log("In ShoppingCart:", updatedItem);
    const updatedItems = items.map((item) => item.id === updatedItem.id ? updatedItem : item);
    setItems(updatedItems);
  }

  // Step #7 - add this function to filter deletedItem from state
  function handleDeleteItem(deletedItem) {
    //console.log("In ShoppingCart:", deletedItem);
    const updatedItems = items.filter((item) => item.id !== deletedItem.id);
    setItems(updatedItems);
  }
  
  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm onAddItem={handleAddItem}/>
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item 
            key={item.id} 
            item={item} 
            onUpdateItem={handleUpdateItem}
            onDeleteItem={handleDeleteItem}
          />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
