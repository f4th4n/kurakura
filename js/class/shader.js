var applyShader = (sprite, fragFilename, vertFilename) => {
    if(vertFilename === undefined || vertFilename === null) {
        this.vertFilename = (cc.sys.isNative ? 'default_native.vsh' : 'default_web.vsh')
    }

    this.fragFilename = fragFilename
    this.sprite = sprite
    this.vertDir = 'res/shader/vertex/'
    this.fragDir = 'res/shader/fragment/'

    if(!'opengl' in cc.sys.capabilities) return

    var vertexShader = this.vertDir + this.vertFilename
    var fragmentShader = this.fragDir + this.fragFilename

    if(cc.sys.isNative) {
        this.shader = new cc.GLProgram()
        this.shader.initWithVertexShaderFilename(vertexShader, fragmentShader)
        this.shader.link()
        this.shader.updateUniforms()
    } else {
        this.shader = new cc.GLProgram()
        this.shader.initWithVertexShaderFilename(vertexShader, fragmentShader)
        this.shader.addAttribute(cc.ATTRIBUTE_NAME_POSITION, cc.VERTEX_ATTRIB_POSITION)
        this.shader.addAttribute(cc.ATTRIBUTE_NAME_TEX_COORD, cc.VERTEX_ATTRIB_TEX_COORDS)
        this.shader.addAttribute(cc.ATTRIBUTE_NAME_COLOR, cc.VERTEX_ATTRIB_COLOR)

        this.shader.link()
        this.shader.updateUniforms()
        this.shader.use()
        //this.shader.setUniformLocationWith1f(this.shader.getUniformLocationForName('u_threshold'), 1.0)
        //this.shader.setUniformLocationWith3f(this.shader.getUniformLocationForName('u_outlineColor'), 0 / 255, 255 / 255, 0 / 255)
    }

    if(cc.sys.isNative) {
        var glProgram_state = cc.GLProgramState.getOrCreateWithGLProgram(this.shader)
        //glProgram_state.setUniformFloat('u_threshold', 1.0)
        //glProgram_state.setUniformVec3('u_outlineColor', {x: 0/255, y: 255/255, z: 0/255})
        this.sprite.setGLProgramState(glProgram_state)
    } else {
        this.sprite.shaderProgram = this.shader
    }
}
