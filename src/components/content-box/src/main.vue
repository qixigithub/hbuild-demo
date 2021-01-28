<template>
  <div :class="warpClasses" :style="styles">
    <template v-for="item,index in data">
      <ty-content-box-item v-bind="item"/>
    </template>
    <slot name="step"></slot>
    <slot name="form"></slot>
    <slot></slot>
  </div>
</template>

<script>
  // import TyContentBoxItem from "./content-box-item";
  const prefixCls = 'ty-content-box';
  export default {
    name: 'TyContentBox',
    // components: {TyContentBoxItem},
    props: {
      minHeight: {
        default: 0
      },
      nopadding: {
        default() {
          return false;
        }
      },
      border: {
        default() {
          return 'default'; //'none','default'
        }
      },
      borderColor: '',
      data: {
        type: Array,
        default() {
          return []
        }
      }
    },
    computed: {
      styles() {
        let styles = {};
        styles.minHeight = `${this.minHeight}px`;
        if (!!this.borderColor) {
          styles.borderColor = this.borderColor;
        }
        return styles;
      },
      warpClasses() {
        return [
          `${prefixCls}`,
          {
            [`${prefixCls}-nopadding`]: this.nopadding,
            [`${prefixCls}-border-${this.border}`]: this.border
          }
        ];
      },
    }
  }
</script>

