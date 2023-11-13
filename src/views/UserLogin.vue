<template>
  <div class="login-container">
    <!-- 粒子系统 -->
    <canvas id="particle-canvas"></canvas>

    <!-- 登录表单 -->
    <el-form class="login-form" ref="loginForm">
      <h1>Login</h1>
      <el-form-item>
        <el-input v-model="loginForm.username" placeholder="Username"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input type="password" v-model="loginForm.password" placeholder="Password"></el-input>
      </el-form-item>
      <div class="button-container">
        <el-button type="primary" @click="onLoginClick">Login</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 粒子系统数据
      w: window.innerWidth,
      h: window.innerHeight,
      canvas: null,
      ctx: null,
      rate: 60,
      arc: 100,
      time: null,
      count: null,
      size: 7,
      speed: 20,
      parts: [],
      colors: ['red', '#f57900', 'yellow', '#ce5c00', '#5c3566'],
      mouse: {
        x: 0,
        y: 0
      },
      loginForm: {
        username: '',
        password: ''
      }
    };
  },
  methods: {
    onLoginClick() {
      console.log('Login clicked', this.loginForm);
      // 登录逻辑
      if (this.loginForm.username === '') {
        this.$message.error('请输入用户名')
        return
      } else if (this.loginForm.password === '') {
        this.$message.error('请输入密码')
        return
      }
      this.$message.success('登录成功')
    },
    initCanvas() {
      this.canvas = this.$el.querySelector('#particle-canvas');
      this.ctx = this.canvas.getContext('2d');
      this.canvas.setAttribute('width', this.w);
      this.canvas.setAttribute('height', this.h);
      this.canvas.addEventListener('mousemove', this.MouseMove, false);
    },
    createParticles() {
      for (let a = 0; a < this.arc; a++) {
        this.parts[a] = {
          x: Math.ceil(Math.random() * this.w),
          y: Math.ceil(Math.random() * this.h),
          toX: Math.random() * 5 - 1,
          toY: Math.random() * 2 - 1,
          c: this.colors[Math.floor(Math.random() * this.colors.length)],
          size: Math.random() * this.size
        };
      }
    },
    animateParticles() {
      this.ctx.clearRect(0, 0, this.w, this.h);
      for (let b = 0; b < this.arc; b++) {
        let c = this.parts[b];
        let distance = this.DistanceBetween(this.mouse, c);
        let ratio = Math.max(Math.min(15 - (distance / 10), 10), 1);
        this.ctx.beginPath();
        this.ctx.arc(c.x, c.y, c.size * ratio, 0, Math.PI * 2, false);
        this.ctx.fillStyle = c.c;
        this.ctx.strokeStyle = c.c;
        if (b % 2 == 0) {
          this.ctx.stroke();
        } else {
          this.ctx.fill();
        }
        c.x += c.toX * (this.time * 0.05);
        c.y += c.toY * (this.time * 0.05);
        if (c.x > this.w) c.x = 0;
        if (c.y > this.h) c.y = 0;
        if (c.x < 0) c.x = this.w;
        if (c.y < 0) c.y = this.h;
      }
      if (this.time < this.speed) {
        this.time++;
      }
      setTimeout(this.animateParticles, 1000 / this.rate);
    },
    MouseMove(e) {
      this.mouse.x = e.layerX;
      this.mouse.y = e.layerY;
    },
    DistanceBetween(p1, p2) {
      let dx = p2.x - p1.x;
      let dy = p2.y - p1.y;
      return Math.sqrt(dx * dx + dy * dy);
    }
  },
  mounted() {
    this.initCanvas();
    this.createParticles();
    this.animateParticles();
  }
};
</script>

<style>
canvas {
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  width: 100vw;
  height: 100vh;
  background-color: #D6EAF8;
  z-index: 1;
}

.login-container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  overflow: hidden;
}

.login-form {
  width: 300px;
  padding: 20px;
  position: relative;
  z-index: 2;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 5px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
}

.login-form h1 {
  text-align: center;
  margin-bottom: 20px;
}

.button-container {
  text-align: center;
}
</style>