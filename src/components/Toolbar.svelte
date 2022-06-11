<script lang="ts">
  import ToolbarItem from './ToolbarItem.svelte'
  import { createEventDispatcher } from 'svelte'

  const emit = createEventDispatcher()

  enum ItemType {
    rectangle,
    ellipse,
  }

  let selected: ItemType | null = null

  const onSelect = (type: ItemType) => {
    selected = type
    switch (type) {
      case ItemType.rectangle:
        emit('draw', 'rectangle')
        break
      case ItemType.ellipse:
        emit('draw', 'ellipse')
        break
    }
  }

  export const removeSelection = () => {
    selected = null
  }
</script>

<ToolbarItem
  icon={'🔲'}
  selected={selected === ItemType.rectangle}
  on:click={() => onSelect(ItemType.rectangle)}
/>
<ToolbarItem
  icon={'⭕️'}
  selected={selected === ItemType.ellipse}
  on:click={() => onSelect(ItemType.ellipse)}
/>
