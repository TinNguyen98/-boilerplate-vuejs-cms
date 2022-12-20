import store from '@/shared/store'

const definedMutation = {
  list: 'SET_LIST',
  pagination: 'SET_PAGINATION',
  detail: 'SET_DETAIL',
  itemList: 'SET_ITEM_LIST',
  clothesDetail: 'SET_CLOTHES_DETAIL',
  itemPagination: 'SET_ITEM_PAGINATION',
}

/**
 * Serves the purpose of freeing up RAM when not using store data
 * Parameter rules: {_module_}/{_state_}
 * Example: For data from root folder => 'root/something state'
 *          Other folder => '{_other module name_}/something state'
 * @param arrStore
 */
export const liberateStore = (...arrStore) => {
  if (!arrStore.length) return

  arrStore.forEach((pathStore) => {
    const [moduleName, stateName] = pathStore.split('/')

    if (moduleName !== 'root') {
      if (
        !verificationPathStore(store.state[moduleName][stateName], pathStore)
      )
        return
      // Reset state based on type of it
      store.commit(`${moduleName}/${definedMutation[stateName]}`,
        defineStateType(store.state[moduleName][stateName])
      )
    } else {
      if (!verificationPathStore(store.state[stateName], pathStore)) return

      store.commit(`${definedMutation[stateName]}`, defineStateType(store.state[stateName]))
    }
  })
}

const verificationPathStore = (pathStore, path) => {
  if (!pathStore) {
    console.error(
      'ERROR: Path store ' +
      path +
      ' not found or not defined yet. Please check parameter again'
    )
    return false
  }
  return true
}

const defineStateType = (pathStore) => {
  switch (typeof pathStore) {
    case 'number':
      return 0
    case 'boolean':
      return false
    case 'string':
      return ''
    case 'object':
      return Array.isArray(pathStore) ? [] : {}
    default:
      return null
  }
}
