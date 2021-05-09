AFRAME.registerComponent('box', {
    schema: {
      width: {type: 'number', default: 1},
      height: {type: 'number', default: 1},
      depth: {type: 'number', default: 1},
      color: {type: 'color', default: '#AAA'}
    },
  
    init: function () {
      var data = this.data;
      var el = this.el;
    //   this.geometry = new THREE.BoxBufferGeometry(data.width, data.height, data.depth);
    //   this.material = new THREE.MeshStandardMaterial({color: data.color});
    //   this.mesh = new THREE.Mesh(this.geometry, this.material);
    //   el.setObject3D('mesh', this.mesh);

      this.geometry = new THREE.BufferGeometry();
        // create a simple square shape. We duplicate the top left and bottom right
        // vertices because each vertex needs to appear once per triangle.
        const vertices = new Float32Array( [
            -1.0, -1.0,  1.0,
            1.0, -1.0,  1.0,
            1.0,  1.0,  1.0,

            1.0,  1.0,  1.0,
            -1.0,  1.0,  1.0,
            -1.0, -1.0,  1.0
        ] );

        // itemSize = 3 because there are 3 values (components) per vertex
        this.geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
        this.material = new THREE.MeshBasicMaterial( { color: 0xff0000 } );
        this.mesh = new THREE.Mesh( this.geometry, this.material );

        el.setObject3D('mesh', this.mesh)
    },
  
    /**
     * Update the mesh in response to property updates.
     */
    update: function (oldData) {
      var data = this.data;
      var el = this.el;
  
      // If `oldData` is empty, then this means we're in the initialization process.
      // No need to update.
      if (Object.keys(oldData).length === 0) { return; }
  
      // Geometry-related properties changed. Update the geometry.
      if (data.width !== oldData.width ||
          data.height !== oldData.height ||
          data.depth !== oldData.depth) {
        el.getObject3D('mesh').geometry = new THREE.BoxBufferGeometry(data.width, data.height,
                                                                      data.depth);
      }
  
      // Material-related properties changed. Update the material.
      if (data.color !== oldData.color) {
        el.getObject3D('mesh').material.color = new THREE.Color(data.color);
      }
    }
  });