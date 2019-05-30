<template>
  <el-col :sm="sizes[0]" :md="sizes[1]" :lg="sizes[2]">
    <el-form-item :label="label" :prop="prop" :rules="validRules" :class="{'inner-width':w100, 'label-height-init': warp, 'right-error': errPosition}">
      <slot></slot>
    </el-form-item>
  </el-col>
</template>

<script>
import * as validate from "@/utils/validate.js";
export default {
  name: 'baseFormItem',
  props: {
    label: {
      type: String,
      required: true
    },
    prop: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: 'default'
    },
    w100: {
      type: Boolean,
      default: false
    },
    warp: {
      type: Boolean,
      default: false
    },
    rule: {
      type: String,
      default: 'required' // 'none' 表示不校验
    },
    errPosition: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      s: {
        default: [12, 8, 6],
        two: [24, 12, 12],
        three: [12, 8, 8]
      }
    }
  },
  computed: {
    sizes() {
      return this.s[this.size]
    },
    validRules() {
      if (!this.prop) {
        return null;
      }
      let rule = {};
      if (~this.rule.indexOf('_')) {
        rule = validate[this.rule.substr(1)];
        rule.required = true;
      } else {
        rule = validate[this.rule];
      }
      return rule;
      // return this.rule || { required: true, message: '必填项', trigger: 'blur' }
    }
  }
};
</script>

<style lang="scss" scoped>
.el-col {
  padding-right: 2em;
}
</style>