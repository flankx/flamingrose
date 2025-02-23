package com.github.flamingrose.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.io.Serializable;

@Entity
@Table(name = "jhi_video")
public class Video extends AbstractAuditingEntity<Long> implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    // @Pattern(regexp = Constants.LOGIN_REGEX)
    @Size(min = 1, max = 64)
    @Column(name = "name", length = 64, nullable = false)
    private String name;

    // @JsonIgnore
    @NotNull
    @Size(min = 1, max = 64)
    @Column(name = "code", length = 64, unique = true, nullable = false)
    private String code;

    @NotNull
    @Size(min = 1, max = 16)
    @Column(name = "type", length = 16, unique = true, nullable = false)
    private String type;

    @Lob // 添加@Lob注解支持大文本
    @Column(name = "pic", columnDefinition = "TEXT") // 修改列定义为TEXT类型
    private String pic;

    @Size(max = 255)
    @Column(name = "url", length = 255)
    private String url;

    @Size(max = 255)
    @Column(name = "description", length = 255)
    private String desc;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getPic() {
        return pic;
    }

    public void setPic(String pic) {
        this.pic = pic;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }

    @Override
    public String toString() {
        return (
            "Video{" +
            "id=" +
            id +
            ", name='" +
            name +
            '\'' +
            ", type='" +
            type +
            '\'' +
            ", code='" +
            code +
            '\'' +
            ", pic='" +
            pic +
            '\'' +
            ", url='" +
            url +
            '\'' +
            ", desc='" +
            desc +
            '\'' +
            '}'
        );
    }
}
