## **IMG PRELOADER**

 
 **to create a preloader: add the tag to the place of the picture**
		
    <f-preload-img></f-preload-img>

**tag attributes:**
	
|attribute|type|description|
|--|--|--|
|class-inh|| if you add it, the picture will get preloader classes |
|id-inh|| the picture will get the id of the preloader |
|defer|| the preloader will not load the image until the startLoading() method is executed |
|queue |integer| First, images are loaded without queue, then in ascending order of numbers.Some pictures may have the same queue |
|no-queue || the preloader will start uploading the image as soon as the tag is added|
|src|string|link to picture|
|no-error||when a loading error occurs, a picture will be created with attribute load-complete="false"|
|error-img|string|when a loading error occurs, this link will be used as src|


**After loading:** 
Preloader tag will be replaced to the picture with the **attributes**:

 - preloaded-img
 - 
   - if the picture is loaded: 		
     - load-complete="true" 	
   - else:
     - load-complete="false"
