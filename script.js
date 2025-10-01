document.addEventListener('DOMContentLoaded', () => {
    const itemInput = document.getElementById('item-input');
    const addButton = document.getElementById('add-button');
    const shoppingList = document.getElementById('shopping-list');

    // Function to create a new list item
    function createListItem(text) {
        const li = document.createElement('li');

        const itemTextSpan = document.createElement('span');
        itemTextSpan.className = 'item-text';
        itemTextSpan.textContent = text;
        li.appendChild(itemTextSpan);

        const editInput = document.createElement('input');
        editInput.type = 'text';
        editInput.className = 'edit-input';
        editInput.value = text;
        li.appendChild(editInput);

        const itemActionsDiv = document.createElement('div');
        itemActionsDiv.className = 'item-actions';
        
        const editButton = document.createElement('button');
        editButton.className = 'edit-btn';
        editButton.textContent = 'Edit';
        itemActionsDiv.appendChild(editButton);

        const saveButton = document.createElement('button');
        saveButton.className = 'save-btn';
        saveButton.textContent = 'Save';
        itemActionsDiv.appendChild(saveButton);

        const removeButton = document.createElement('button');
        removeButton.className = 'remove-btn';
        removeButton.textContent = 'Remove';
        itemActionsDiv.appendChild(removeButton);

        li.appendChild(itemActionsDiv);
        return li;
    }

    // Add Items
    function addItem() {
        const itemText = itemInput.value.trim();
        if (itemText !== '') {
            const newListItem = createListItem(itemText);
            shoppingList.appendChild(newListItem);
            itemInput.value = '';
        }
    }

    addButton.addEventListener('click', addItem);
    itemInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addItem();
        }
    });

    // Handle button clicks (Remove, Edit, Save)
    shoppingList.addEventListener('click', (e) => {
        const clickedElement = e.target;
        const listItem = clickedElement.closest('li');

        if (!listItem) return;

        // Remove Items
        if (clickedElement.classList.contains('remove-btn')) {
            listItem.remove();
        }

        // Edit Items: Change to input field
        if (clickedElement.classList.contains('edit-btn')) {
            const itemTextSpan = listItem.querySelector('.item-text');
            const editInput = listItem.querySelector('.edit-input');
            const saveButton = listItem.querySelector('.save-btn');
            const editButton = listItem.querySelector('.edit-btn');
            
            itemTextSpan.classList.add('editing');
            editInput.classList.add('editing');
            editButton.style.display = 'none';
            saveButton.style.display = 'inline-block';
            editInput.focus();
        }

        // Save Edits: Change back to text
        if (clickedElement.classList.contains('save-btn')) {
            const itemTextSpan = listItem.querySelector('.item-text');
            const editInput = listItem.querySelector('.edit-input');
            const saveButton = listItem.querySelector('.save-btn');
            const editButton = listItem.querySelector('.edit-btn');
            
            itemTextSpan.textContent = editInput.value;
            itemTextSpan.classList.remove('editing');
            editInput.classList.remove('editing');
            editButton.style.display = 'inline-block';
            saveButton.style.display = 'none';
        }
    });
});