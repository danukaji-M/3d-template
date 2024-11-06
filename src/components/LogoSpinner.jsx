import { useEffect, useRef } from "react";
import * as THREE from 'three';
import { OBJLoader } from "three/examples/jsm/Addons.js";
import WebGL from 'three/addons/capabilities/WebGL.js';
const LogoSpinner = () =>{
    const mountRef = useRef(null);
    useEffect(()=>{
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight,0.1,1000);
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth,window.innerHeight);
        mountRef.current.appendChild(renderer.domElement);

        const textureLoader = new THREE.TextureLoader();
        const texture = textureLoader.load('src/assets/texture.jpg');
        const material = new THREE.MeshBasicMaterial({ map: texture });
        
        const loader = new OBJLoader();
        loader.load('src/assets/logo.obj', (obj)=>{
            obj.traverse((child) => {
                if (child.isMesh) {
                  child.material = new THREE.MeshBasicMaterial({ map: texture });
                }
              });
            scene.add(obj);
            obj.position.set(0,0,0);
        })
        camera.position.z = 5;

        const animate = () =>{
            requestAnimationFrame(animate);
            scene.traverse((child)=>{
                if(child instanceof THREE.Mesh){
                    child.rotation.y +=0.05;
                }
            });
            renderer.render(scene,camera);
        };
        if(WebGL.isWebGL2Available()){
            animate();
        }else{
            const warning = WebGL.getWebGL2ErrorMessage();
            mountRef.current.appendChild(warning);
        }
        return () =>{
             mountRef.current.removeChild(renderer.domElement);
        };
    },[]);
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div ref={mountRef} className="w-full h-full">
                {/* 3D object Loading here */}
            </div>
        </div>
    );
}

export default LogoSpinner;

