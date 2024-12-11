package com.darkoum.darkoum.service.interfaces;

import com.darkoum.darkoum.dtos.request.UserDtoRequest;
import com.darkoum.darkoum.dtos.response.UserDtoResponse;

import java.util.List;

public interface UserServiceInterface {
    public UserDtoResponse create(UserDtoRequest userRequest);

    public UserDtoResponse update(UserDtoRequest userRequest, Long id);

    public List<UserDtoResponse> findAll() ;

    public UserDtoResponse findUserById(Long id);

    public void delete(Long id);
}
