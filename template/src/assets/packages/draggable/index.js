var Sortable = require('sortablejs')
if (!Array.from) {
  Array.from = function (object) {
    return [].slice.call(object)
  }
}

function buildAttribute (object, propName, value) {
  if (value === undefined || value === 'undefined') {
    return object
  }
  object = (object === null) ? {} : object
  object[propName] = value
  return object
}

function removeNode (node) {
  node.parentElement.removeChild(node)
}

function insertNodeAt (fatherNode, node, position) {
  const refNode = (position === 0) ? fatherNode.children[0] : fatherNode.children[position - 1].nextSibling
  fatherNode.insertBefore(node, refNode)
}

// function computeVmIndex (vnodes, element) {
//   return vnodes.map(elt => elt.elm).indexOf(element)
// }

// function computeIndexes (slots, children, isTransition) {
//   console.log('----computeIndexes ____', slots)
//   if (!slots) {
//     return []
//   }

//   const elmFromNodes = slots.map(elt => elt.elm)
//   console.log('----elmFromNodes ____', elmFromNodes)
//   const rawIndexes = [...children].map(elt => elmFromNodes.indexOf(elt))
//   console.log('----rawIndexes ____', rawIndexes)
//   return isTransition ? rawIndexes.filter(ind => ind !== -1) : rawIndexes
// }

function emit (evtName, evtData) {
  this.$nextTick(() => this.$emit(evtName.toLowerCase(), evtData))
}

function delegateAndEmit (evtName) {
  return (evtData) => {
    if (this.realList !== null) {
      this['onDrag' + evtName](evtData)
    }
    emit.call(this, evtName, evtData)
  }
}

const eventsListened = ['Start', 'Add', 'Remove', 'Update', 'End']
const eventsToEmit = ['Choose', 'Sort', 'Filter', 'Clone']
const readonlyProperties = ['Move', ...eventsListened, ...eventsToEmit].map(evt => 'on' + evt)

const props = {
  options: Object,
  list: {
    type: Array,
    required: false,
    default: null
  },
  value: {
    type: Array,
    required: false,
    default: null
  },
  noTransitionOnDrag: {
    type: Boolean,
    default: false
  },
  clone: {
    type: Function,
    default: (original) => { return original }
  },
  element: {
    type: String,
    default: 'div'
  },
  move: {
    type: Function,
    default: null
  },

  dragSelector: {
    type: String,
    default: null
  }
}

export default {
  name: 'td-draggable',
  props,
  data () {
    return {
      transitionMode: false,
      noneFunctionalComponentMode: false,
      init: false
    }
  },

  render (h) {
    const slots = this.$slots.default
    if (slots && slots.length === 1) {
      const child = slots[0]
      if (child.componentOptions && child.componentOptions.tag === 'transition-group') {
        this.transitionMode = true
      }
    }
    let children = slots
    const { footer } = this.$slots
    if (footer) {
      children = slots ? [...slots, ...footer] : [...footer]
    }
    var attributes = null
    const update = (name, value) => { attributes = buildAttribute(attributes, name, value) }
    update('attrs', this.$attrs)

    return h(this.element, attributes, children)
  },

  mounted () {
    this.noneFunctionalComponentMode = this.element.toLowerCase() !== this.$el.nodeName.toLowerCase()

    if (this.noneFunctionalComponentMode && this.transitionMode) {
      throw new Error(`Transition-group inside component is not supported. Please alter element value or remove transition-group. Current element value: ${this.element}`)
    }
    var optionsAdded = {}
    eventsListened.forEach(elt => {
      optionsAdded['on' + elt] = delegateAndEmit.call(this, elt)
    })

    eventsToEmit.forEach(elt => {
      optionsAdded['on' + elt] = emit.bind(this, elt)
    })

    const options = Object.assign({}, this.options, optionsAdded, { onMove: (evt, originalEvent) => { return this.onDragMove(evt, originalEvent) } })
    !('draggable' in options) && (options.draggable = '>*')
    this._sortable = new Sortable(this.rootContainer, options)
    // this.computeIndexes()
  },

  beforeDestroy () {
    this._sortable.destroy()
  },

  computed: {
    rootContainer () {
      return this.transitionMode ? this.$el.children[0] : (this.dragSelector ? this.$el.querySelector(this.dragSelector) : this.$el)
    },
    realList () {
      return (this.list) ? this.list : this.value
    }
  },

  watch: {
    options: {
      handler (newOptionValue) {
        for (var property in newOptionValue) {
          if (readonlyProperties.indexOf(property) === -1) {
            this._sortable.option(property, newOptionValue[property])
          }
        }
      },
      deep: true
    }
  },

  methods: {
    getUnderlyingVm (evt) {
      if (!evt) {
        return null
      }
      let index = evt.oldIndex
      if (typeof (index) === 'undefined' || index === -1) {
        return null
      }
      const element = this.realList[index]
      return { index, element }
    },
    emitChanges (evt) {
      this.$nextTick(() => {
        this.$emit('change', evt)
      })
    },
    alterList (onList) {
      if (this.list) {
        onList(this.list)
      } else {
        const newList = [...this.value]
        onList(newList)
        this.$emit('input', newList)
      }
    },
    spliceList () {
      const spliceList = list => list.splice(...arguments)
      this.alterList(spliceList)
    },
    updatePosition (oldIndex, newIndex) {
      const updatePosition = list => list.splice(newIndex, 0, list.splice(oldIndex, 1)[0])
      this.alterList(updatePosition)
    },
    onDragStart (evt) {
      this.context = this.getUnderlyingVm(evt)
      // const element = this.realList[evt.oldIndex]
      if (this.context) {
        evt.item._underlying_vm_ = this.clone(this.context.element)
      }
    },
    onDragMove (evt) {
      // console.log("onDragMove: ", evt)
    },
    onDragUpdate (evt) {
      removeNode(evt.item)
      insertNodeAt(evt.from, evt.item, evt.oldIndex)
      const oldIndex = this.context.index
      const newIndex = evt.newIndex
      this.updatePosition(evt.oldIndex, evt.newIndex)
      const moved = { element: this.context.element, oldIndex, newIndex }
      this.emitChanges({ moved })
    },
    onDragEnd (evt) {
    }
  }
}
