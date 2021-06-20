import config from './config';

export default class Data {
	api(path, method = 'GET', body = null, requiresAuth = false, credentials = null){
    const url = config.apiBaseUrl + path;

    const options = {
      method,
      headers: {
          'Content-Type': 'application/json; charset=utf-8',
      }
    }

    if(body !== null){
      options.body = JSON.stringify(body);
    }

    //check if endpoint(or route) requires user auth
    if(requiresAuth){
      //btoa creates base-64 encoded string from string of data
      const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);

      //set authorization header on each request that requires it by adding Authorization poperty to the headers object
      options.headers['Authorization'] = `Basic ${encodedCredentials}`;
    }

    return fetch(url, options);
	}

  /**
   * USER ACTIONS
   */

  // GETS individual user
  async getUser(emailAddress, password) {
    const response = await this.api(`/users`, 'GET', null, true, { emailAddress, password });
    if (response.status === 200) {
      return response.json().then(data => data);
    }
    else if (response.status === 401) {
      return null;
    }
    else {
      throw new Error();
    }
  }
  
  // POST creates user
  async createUser(user) {
    const response = await this.api('/users', 'POST', user);
    if (response.status === 201) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    }
    else {
      throw new Error();
    }
  }

  /**
   * COURSE ACTIONS
   */

  // GETS all courses
	async getCourses() {
		const response = await this.api('/courses', 'GET', null);
		if (response.status === 200){
			return response.json().then(data => data);
		} else if (response.status === 401){
			return null;
		} else {
			throw new Error();
		}
	}

  // GETS individual course
	async getCourse(id) {
    const response = await this.api(`/courses/${id}`, 'GET', null);
    if (response.status === 200) {
      return response.json().then(data => data);
    }
    else if (response.status === 401) {
      return null;
    }
    else {
      throw new Error();
    }
  }

  // POST creates course
  async createCourse(course, emailAddress, password) {
    const response = await this.api('/courses', 'POST', course, true, { emailAddress, password });
    if (response.status === 201) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    }
    else {
      throw new Error();
    }
  }
  
  // PUT updates course
  async updateCourse(course, id, emailAddress, password) {
    const response = await this.api(`/courses/${id}`, 'PUT', course, true, { emailAddress, password });
    if (response.status === 204) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    }
    else {
      throw new Error();
    }
  }

  //DELETEs course
  async deleteCourse(course, emailAddress, password){
    const response = await this.api(`/courses/${course.id}`, 'DELETE', null, true, { emailAddress, password});
    if(response.status === 204) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    }
    else {
      console.log(emailAddress, password)
      throw new Error();
    }
  }
}