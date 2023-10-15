<script>
import {authFunc,authStore} from '../Authentication/Auth'
let placeholder;
</script>
<div class="card w-96 bg-secondary text-primary-content">
  <div class="card-body">
    <h2 class="card-title">Login options</h2>
{#if !$authStore}
<button class="btn btn-primary" on:click={authFunc.loginFunciton}>Continue with google </button>
{:else}
<button class="btn btn-primary" on:click={authFunc.signoutFunction}>Logout </button>
{/if}
  </div>
</div> 

<style>
  .card{
   margin-left: 10px;
   margin-top: 10%; 
  }
  @media (min-width: 450px) {
  
  .card {margin-left: 50px;  }
}
@media (min-width: 500px) {
  
  .card {margin-left: 80px;  }
}
@media (min-width: 630px) {
  
  .card {margin-left: 150px;  }
}
@media (min-width: 750px) {
  
  .card {margin-left: 230px;  }
}
@media (min-width: 800px) {
  
  .card {margin-left: 260px;  }
}
@media (min-width: 1000px) {
  
  .card {margin-left: 320px;  }
}
@media (min-width: 1080px) {
  
  .card {margin-left: 390px;  }
}
@media (min-width: 1200px) {

  .card {margin-left: 770px;}
}
</style>
